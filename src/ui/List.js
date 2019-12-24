import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, View as NativeView } from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';
import I18n from 'react-native-i18n';
import View from './View';
import Text from './Text';
import Indicator from './Indicator';
import Button from './Button';
import { expResponsiveHeight } from './utils/responsiveDimensions';
import { getThemeColor } from './utils/colors';
import { getTheme } from './Theme';
import {
  BasePropTypes,
  dimensionsStyles,
  borderStyles,
  backgroundColorStyles,
} from './Base';
import Network from './Base/Network';
class List extends Network {
  static propTypes = {
    ...BasePropTypes,
    ...Network.propTypes,
    columns: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    noResultsLabel: PropTypes.string,
    noResultsLabelSize: PropTypes.number,
    rowRenderer: PropTypes.func,
    rowHeight: PropTypes.number,
    indicatorColor: PropTypes.string,
    errorLabelColor: PropTypes.string,
    noResultsLabelColor: PropTypes.string,
    retryButtoncolor: PropTypes.string,
    retryButtonBackgroundColor: PropTypes.string,
  };
  static defaultProps = {
    ...Network.defaultProps,
    ...getTheme().list,
    columns: 1,
    data: [],
    rowHeight: 20,
  };
  constructor(props) {
    super(props);
    this.dataProvider = new DataProvider((r1, r2) => r1 !== r2);
    this.mainIndicator = 'loading';
    this.state = {
      ...super.state,
      firstFetchDone: !props.apiRequest && !props.firebaseRequest,
      refreshing: false,
      loading: false,
      layoutProvider: null,
      dataProvider: props.flatlist
        ? { _data: props.data }
        : this.dataProvider.cloneWithRows(props.data),
      errorLabel: '',
      layoutReady: false,
    };
  }
  componentDidMount() {
    super.componentDidMount();
  }
  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.data !== this.props.data) {
      this.setData(nextProps.data)
    }
    if (nextProps.refreshControl !== this.props.refreshControl) {
      if (this.state.loading) return;
      this.reload();
    }
    if (nextProps.appendControl !== this.props.appendControl) {
      if (this.state.loading) return;
      this.append();
    }
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  setStartFetching() {
    this.setState({
      errorLabel: '',
    });
  }
  setData = (data, cb) => {
    this.setState(
      {
        firstFetchDone: true,
        dataProvider: this.props.flatlist
          ? { _data: data }
          : this.dataProvider.cloneWithRows(data),
      },
      cb,
    );
  };
  setError = errorLabel => {
    this.setState({
      firstFetchDone: true,
      errorLabel,
    });
  };
  setEndFetching = () => { };
  updateItemInList = (id, changedData) => {
    const { _data } = this.state.dataProvider;
    const index = _data.findIndex(
      item => Object.getDeepProp(item, this.props.idPathInData) === id,
    );
    _data[index] = {
      ..._data[index],
      ...changedData,
    };
    this.setData(_data);
  };
  deleteItemInList = (id) => {
    const { _data } = this.state.dataProvider;
    const index = _data.findIndex(
      item => Object.getDeepProp(item, this.props.idPathInData) === id,
    );
    _data.splice(index, 1)
    this.setData(_data);
  }
  updateAllItem = (id, changedData) => {
    const { _data } = this.state.dataProvider;
    _data.forEach((item, index) => {
      if (item.user.id === id) {
        _data[index] = {
          ..._data[index],
          ...changedData,
        };
      }
    });
    this.setData(_data);
  }
  handleParentViewLayout = e => {
    if (this.props.flatlist) {
      this.setState({
        layoutReady: true,
      });
    } else {
      const { width } = e.nativeEvent.layout;
      const bl = this.props.blw || this.props.bw || 1;
      const br = this.props.brw || this.props.bw || 1;
      const borderThickness = (bl + br) / this.props.columns;
      this.setState({
        layoutReady: true,
        layoutProvider: new LayoutProvider(
          () => 1,
          (type, dim) => {
            dim.width = width / this.props.columns - borderThickness;
            dim.height = expResponsiveHeight(this.props.rowHeight);
          },
        ),
      });
    }
  };
  renderFooter = () => {
    if (this.state.refreshing) return null;
    if (this.state.loading || !this.state.firstFetchDone) {
      return (
        this.props.noIndicator ? null :
        <View width={this.props.handelCenter ? 100 : undefined} centerX centerY p={10} style={{ transform: [{ scaleX: this.props.scal ? -1 : 1 }] }} >
          <Indicator color={this.props.indicatorColor} size={12} />
        </View>
      );
    }
    if (this.state.errorLabel) {
      return (
        <View width={this.props.handelCenter ? 100 : undefined} centerX centerY p={10} style={{ transform: [{ scaleX: this.props.scal ? -1 : 1 }] }} >
          <Text bold color={this.props.errorLabelColor}>
            {this.state.errorLabel}
          </Text>
          <Button
            title={I18n.t('ui-retry')}
            backgroundColor={this.props.retryButtonBackgroundColor}
            color={this.props.retryButtoncolor}
            mv={8}
            onPress={() => {
              this.reload();
            }}
            processing={this.state.refreshing}
            size={7.5}
            ph={10}
          />
        </View>
      );
    }
    if (this.state.dataProvider._data.length === 0 && !this.props.centerFavourite) {
      return (
        <View width={this.props.handelCenter ? 100 : undefined} centerX centerY p={10} style={{ transform: [{ scaleX: this.props.scal ? -1 : 1 }], height: '100%' }} >
          <Text bold color={this.props.noResultsLabelColor} size={this.props.noResultsLabelSize}>
            {this.props.noResultsLabel || I18n.t('ui-noResultsFound')}
          </Text>
        </View>
      );
    }
    return null;
  };
  renderFlatList = () => (
    <FlatList
      data={this.state.dataProvider._data}
      showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
      keyExtractor={(item, index) => String(index)}
      randomUpdateProp={this.state.updated}
      // style={{scaleX:this.props.rtl ? this.props.horizontal ? -1 : 1 : 1}}
      key={this.props.changeview ? this.props.changeview : null}
      horizontal={this.props.horizontal ? true : false}
      numColumns={this.props.columns ? this.props.columns : 0}
      changeShape={this.props.changeShape ? this.props.changeShape : false}
      renderItem={({ item, index }) =>
        React.cloneElement(this.props.rowRenderer(item, index), {
          updateItemInList: this.updateItemInList,
          deleteItemInList: this.deleteItemInList,
          updateAllItem: this.updateAllItem,
        })
      }
      onEndReachedThreshold={0.2}
      onEndReached={() => {
        if (this.page < this.pageCount && !this.state.loading) {
          this.page++;
          this.fetch('loading');
        }
      }}
      extraData={this.state.dataProvider._data}
      ListFooterComponent={this.renderFooter}
      refreshControl={this.props.stopRefresh ? null :
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.fetch('refreshing', true);
          }}
          colors={[getThemeColor(this.props.indicatorColor)]}
          tintColor={getThemeColor(this.props.indicatorColor)}
        />
      }
    />
  );
  renderRecyclerListView = () => (
    <RecyclerListView
      layoutProvider={this.state.layoutProvider}
      dataProvider={this.state.dataProvider}
      rowRenderer={(type, data) =>
        React.cloneElement(this.props.rowRenderer(data), {
          updateItemInList: this.updateItemInList,
          deleteItemInList: this.deleteItemInList,
          updateAllItem: this.updateAllItem,
        })
      }
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (this.page < this.pageCount && !this.state.loading) {
          this.page++;
          this.fetch('loading');
        }
      }}
      renderFooter={this.renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.fetch('refreshing', true);
          }}
          colors={[getThemeColor(this.props.indicatorColor)]}
          tintColor={getThemeColor(this.props.indicatorColor)}
        />
      }
    />
  );
  render() {
    return (
      <NativeView
        style={[
          dimensionsStyles(this.props),
          backgroundColorStyles(this.props),
          {
            alignSelf: this.props.center ? 'center' : 'stretch',
            flex: this.props.height ? undefined : 1,
            transform: [{ scaleX: this.props.scal ? -1 : 1 }],
          },
          borderStyles(this.props),
        ]}
        onLayout={this.handleParentViewLayout}
      >
        {this.state.layoutReady
          ? this.props.flatlist
            ? this.renderFlatList()
            : this.renderRecyclerListView()
          : null}
        {!(this.state.loading || !this.state.firstFetchDone) &&
          !this.state.errorLabel &&
          this.state.dataProvider._data.length === 0 && this.props.centerFavourite &&
          <View width={this.props.handelCenter ? 100 : undefined} centerX centerY p={10} style={{ transform: [{ scaleX: this.props.scal ? -1 : 1 }], height: '100%' }} >
            <Text bold color={this.props.noResultsLabelColor} size={this.props.noResultsLabelSize}>
              {this.props.noResultsLabel || I18n.t('ui-noResultsFound')}
            </Text>
          </View>
        }
      </NativeView>
    );
  }
}
export default List;