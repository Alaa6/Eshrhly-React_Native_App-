import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import firebase from 'react-native-firebase';

const { CancelToken } = axios;

class Network extends PureComponent {
  static propTypes = {
    limit: PropTypes.number,
    paging: PropTypes.bool,
    apiRequest: PropTypes.shape({
      url: PropTypes.string.isRequired,
      responseResolver: PropTypes.func.isRequired,
      onError: PropTypes.func,
      ContentType: PropTypes.string,
      pageFieldName: PropTypes.string,
      limitFieldName: PropTypes.string,
      params: PropTypes.object,
    }),
    firebaseRequest: PropTypes.shape({
      collectionName: PropTypes.string.isRequired,
      onError: PropTypes.func,
      orderBy: PropTypes.string,
      desc: PropTypes.bool,
      conditions: PropTypes.arrayOf(PropTypes.array),
    }),
  };

  static defaultProps = {
    limit: 20,
    paging: true,
  };

  constructor(props) {
    super(props);

    this.page = 0;
    this.pageCount = 1;
    if (props.apiRequest) {
      this.source = CancelToken.source();
    }

    if (props.firebaseRequest) {
      this.firebaseRef = firebase
        .firestore()
        .collection(props.firebaseRequest.collectionName);
      this.lastItem = null;
    }
  }

  componentDidMount() {
    this.fetch(this.mainIndicator, true);
  }

  componentWillReceiveProps(nextProps, CB) {
    if (this.props.apiRequest) {
      if (
        nextProps.apiRequest.params &&
        JSON.stringify(nextProps.apiRequest.params) !==
        JSON.stringify(this.props.apiRequest.params)
      ) {
        this.reload();
        if (CB) CB();
      }
    } else if (this.props.firebaseRequest) {
      if (
        (nextProps.firebaseRequest.orderBy &&
          nextProps.firebaseRequest.orderBy !==
          this.props.firebaseRequest.orderBy) ||
        (nextProps.firebaseRequest.desc &&
          nextProps.firebaseRequest.desc !== this.props.firebaseRequest.desc) ||
        (nextProps.firebaseRequest.conditions &&
          nextProps.firebaseRequest.conditions !==
          this.props.firebaseRequest.conditions)
      ) {
        this.reload();
        if (CB) CB();
      }
    }
  }

  componentWillUnmount() {
    if (this.props.apiRequest) {
      this.source.cancel('Network Operation Canceled.');
    }
  }

  reload = () => {
    this.page = 0;
    this.setData([], () => {
      this.fetch(this.mainIndicator, true);
    });
  };

  // append data by default
  async fetch(indicator, reset, d) {

    if (this.state[indicator]) return;
    if (!this.props.apiRequest && !this.props.firebaseRequest) return;

    this.setStartFetching();
    this.setState({
      [indicator]: true,
    });

    const data = reset ? [] : d || this.state.dataProvider._data;
    this.page = reset ? 1 : this.page;
    this.lastItem = reset ? null : this.lastItem;

    if (this.props.apiRequest) {
      this.apiLoadData(indicator, data);
    } else if (this.props.firebaseRequest) {
      this.firebaseLoadData(indicator, data);
    }
  }

  apiLoadData = async (loadingIndicator, oldData = []) => {
    const { apiRequest, paging } = this.props;

    const {
      url,
      pageFieldName,
      limitFieldName,
      params,
      ContentType,
      responseResolver,
      onError,
      transformData,
      token,
      lang
    } = apiRequest;

    const pagingParams = {};
    if (paging) {
      pagingParams[pageFieldName || 'page'] = this.page;
      pagingParams[limitFieldName || 'limit'] = this.props.limit;
    }

    try {
      const response = await axios.get(`${url}`, {
        cancelToken: this.source.token,
        params: {
          ...pagingParams,
          ...params,
        },
        headers: {
          'Content-Type': ContentType || 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept-Language': `${lang}`,

        },
      });

      const { data, pageCount } = responseResolver(response);
      this.pageCount = pageCount;

      let newData = data;

      if (transformData) {
        newData = data.map(item => transformData(item));
      }

      const allData = [...oldData, ...newData];

      this.setData(allData);
      this.setState({
        [loadingIndicator]: false,
      });

      this.setEndFetching(allData);
    } catch (error) {
      if (!axios.isCancel(error)) {
        this.setError(onError(error));
        this.setState({
          [loadingIndicator]: false,
        });
      }
    }
  };

  firebaseLoadData = async (loadingIndicator, oldData = []) => {
    const {
      conditions,
      orderBy,
      desc,
      transformData,
      onError,
    } = this.props.firebaseRequest;
    const data = [];

    try {
      let acc = this.firebaseRef;
      if (conditions && conditions.length) {
        conditions.forEach(condition => {
          acc = acc.where(condition[0], condition[1], condition[2]);
        });
      }
      if (orderBy) {
        if (desc) acc = acc.orderBy(orderBy, 'desc');
        else acc = acc.orderBy(orderBy);
      }

      if (this.props.paging) {
        this.pageCount = Math.ceil(
          (await acc.get()).docs.length / this.props.limit,
        );

        acc = acc.startAfter(this.lastItem).limit(this.props.limit);

        const tempSnapShot = await acc.limit(this.props.limit).get();
        this.lastItem = tempSnapShot.docs[tempSnapShot.docs.length - 1];
      }

      const querySnapshot = await acc.get();
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      let newData = data;

      if (transformData) {
        newData = data.map(item => transformData(item));
      }

      const allData = [...oldData, ...newData];

      this.setData(allData);
      this.setState({
        [loadingIndicator]: false,
      });

      this.setEndFetching(allData);
    } catch (error) {
      this.setError(onError(error));
      this.setState({
        [loadingIndicator]: false,
      });
    }
  };

  render() {
    return null;
  }
}

export default Network;
