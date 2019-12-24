import { Platform, PixelRatio } from 'react-native';
import PropTypes from 'prop-types';

import { getThemeColor } from './utils/colors';
import { normalize } from './utils/text';
import { getFonts } from './Theme';

import {
  moderateScale,
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
  expResponsiveHeight,
  expResponsiveWidth,
} from './utils/responsiveDimensions';

const { roundToNearestPixel } = PixelRatio;

export const BasePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  rtl: PropTypes.bool,

  left: PropTypes.bool,
  right: PropTypes.bool,
  center: PropTypes.bool,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  centerX: PropTypes.bool,
  centerY: PropTypes.bool,
  reverse: PropTypes.bool,

  equalSize: PropTypes.number,
  circleRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  expWidth: PropTypes.number,
  expHeight: PropTypes.number,

  font: PropTypes.string,
  size: PropTypes.number,
  bold: PropTypes.bool,
  color: PropTypes.string,
  disabledColor: PropTypes.string,

  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  stretch: PropTypes.bool,
  leftSelf: PropTypes.bool,
  rightSelf: PropTypes.bool,
  topSelf: PropTypes.bool,
  bottomSelf: PropTypes.bool,
  centerSelf: PropTypes.bool,

  row: PropTypes.bool,
  spaceBetween: PropTypes.bool,
  spaceAround: PropTypes.bool,
  stretchChildren: PropTypes.bool,
  wrap: PropTypes.bool,

  backgroundColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
  elevation: PropTypes.number,

  p: PropTypes.number,
  ph: PropTypes.number,
  pv: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  pt: PropTypes.number,
  pb: PropTypes.number,
  m: PropTypes.number,
  mh: PropTypes.number,
  mv: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,

  bc: PropTypes.string,
  bbc: PropTypes.string,
  btc: PropTypes.string,
  blc: PropTypes.string,
  brc: PropTypes.string,
  bw: PropTypes.number,
  bbw: PropTypes.number,
  btw: PropTypes.number,
  blw: PropTypes.number,
  brw: PropTypes.number,
  
  borderRadius: PropTypes.number,
  translateNumbers: PropTypes.bool,
};

export const dimensionsStyles = props => {
  const { width, height, expWidth, expHeight, equalSize } = props;

  let h = roundToNearestPixel(responsiveHeight(height));
  if (equalSize) h = roundToNearestPixel(responsiveWidth(equalSize));
  if (expHeight) h = roundToNearestPixel(expResponsiveHeight(expHeight));

  let w = roundToNearestPixel(responsiveWidth(width));
  if (equalSize) w = roundToNearestPixel(responsiveWidth(equalSize));
  if (expWidth) w = roundToNearestPixel(expResponsiveWidth(expWidth));

  return {
    width: w ? w : undefined,
    height: h ? h : undefined,
  };
};

export const selfLayoutStyles = props => {
  const {
    flex,
    stretch,
    centerSelf,
    leftSelf,
    rightSelf,
    topSelf,
    bottomSelf,
  } = props;

  let alignSelf = topSelf || leftSelf ? 'flex-start' : undefined;
  alignSelf = bottomSelf || rightSelf ? 'flex-end' : alignSelf;
  alignSelf = centerSelf ? 'center' : alignSelf;
  alignSelf = stretch ? 'stretch' : alignSelf;
  const f = flex ? (typeof flex === 'number' ? flex : 1) : undefined;

  return {
    flex: f ? f : undefined,
    alignSelf,
  };
};

export const childrenLayoutStyles = props => {
  const styles = {};
  const {
    row,
    top,
    bottom,
    centerY,
    left,
    right,
    centerX,
    center,
    stretchChildren,
    spaceBetween,
    spaceAround,
    reverse,
    wrap,
  } = props;

  const rtl = reverse ? !props.rtl : props.rtl;

  if (row) {
    styles.flexDirection = rtl ? 'row-reverse' : 'row';
    styles.alignItems = 'center';
    styles.flexWrap = wrap ? 'wrap' : 'nowrap';
  } else {
    styles.flexDirection = 'column';
    styles.alignItems = rtl ? 'flex-end' : 'flex-start';

    if (top) styles.justifyContent = 'flex-start';
    if (bottom) styles.justifyContent = 'flex-end';
    if (centerY) styles.justifyContent = 'center';

    if (left) styles.alignItems = 'flex-start';
    if (right) styles.alignItems = 'flex-end';
    if (centerX) styles.alignItems = 'center';
  }
  if (center) {
    styles.justifyContent = 'center';
    styles.alignItems = 'center';
  }

  if (stretchChildren) {
    styles.alignItems = 'stretch';
    styles.alignSelf = 'stretch';
  }
  if (spaceBetween) styles.justifyContent = 'space-between';
  if (spaceAround) styles.justifyContent = 'space-around';

  return styles;
};

export const colorStyles = props => ({
  color: getThemeColor(props.color),
});

export const fontSizeStyles = (props, scaleFix = 1) => ({
  fontSize: Math.round(normalize(responsiveFontSize(props.size * scaleFix))),
});

export const fontFamilyStyles = props => {
  const { font, bold } = props;

  return {
    fontFamily: font || (bold ? getFonts().bold : getFonts().normal),
    fontWeight:
      getFonts().boldIsStyle && Platform.OS === 'ios'
        ? bold
          ? 'bold'
          : 'normal'
        : null,
  };
};

export const textDirectionStyles = props => {
  const { left, right, center, stretch, reverse } = props;
  const rtl = reverse ? !props.rtl : props.rtl;

  const styles = {
    textAlignVertical: 'center',
    writingDirection: props.rtl ? 'rtl' : 'ltr',
    textAlign: rtl ? 'right' : 'left',
  };

  if (stretch) styles.alignSelf = 'stretch';
  if (left) styles.textAlign = 'left';
  if (right) styles.textAlign = 'right';
  if (center) styles.textAlign = 'center';

  return styles;
};

export const backgroundColorStyles = props => {
  const styles = {};
  const { elevation, backgroundColor } = props;

  if (backgroundColor && typeof backgroundColor === 'string') {
    styles.backgroundColor = getThemeColor(backgroundColor);
  } else if (elevation) {
    styles.backgroundColor = 'white';
  }

  return styles;
};

export const elevationStyles = props => {
  const styles = {};
  const { elevation } = props;

  if (elevation) {
    if (Platform.OS === 'ios') {
      styles.shadowColor = 'rgba(0,0,0, .4)';
      styles.shadowOffset = {
        height: roundToNearestPixel(elevation - 1),
        width: roundToNearestPixel(elevation - 1),
      };
      styles.shadowOpacity = 1;
      styles.shadowRadius = roundToNearestPixel(elevation - 1);
    } else {
      styles.elevation = roundToNearestPixel(elevation);
      styles.shadowColor ="red"
    }
  }

  return styles;
};

export const paddingStyles = props => {
  const { p, row, rtl } = props;
  let { pv, pt, pb } = props;
  let { ph, pl, pr } = props;

  pv = typeof pv === 'number' ? pv : p ? p : 0;
  ph = typeof ph === 'number' ? ph : p ? p : 0;
  pt = typeof pt === 'number' ? pt : pv;
  pb = typeof pb === 'number' ? pb : pv;
  pl = typeof pl === 'number' ? pl : ph;
  pr = typeof pr === 'number' ? pr : ph;

  const temp_pl = pl;
  const temp_pr = pr;
  if ((pl || pr) && rtl && !row) {
    pr = temp_pl;
    pl = temp_pr;
  }

  return {
    paddingTop: moderateScale(pt),
    paddingBottom: moderateScale(pb),
    paddingLeft: moderateScale(pl),
    paddingRight: moderateScale(pr),
  };
};

export const marginStyles = props => {
  const styles = {};

  const { m, row, rtl } = props;
  let { mh, mv, ml, mr, mt, mb } = props;

  mh = typeof mh === 'number' ? mh : m ? m : 0;
  mv = typeof mv === 'number' ? mv : m ? m : 0;
  ml = typeof ml === 'number' ? ml : mh;
  mr = typeof mr === 'number' ? mr : mh;
  mt = typeof mt === 'number' ? mt : mv;
  mb = typeof mb === 'number' ? mb : mv;

  const temp_ml = ml;
  const temp_mr = mr;

  if ((ml || mr) && rtl && !row) {
    mr = temp_ml;
    ml = temp_mr;
  }

  styles.marginLeft = moderateScale(ml);
  styles.marginRight = moderateScale(mr);
  styles.marginTop = moderateScale(mt);
  styles.marginBottom = moderateScale(mb);

  return styles;
};

export const borderStyles = props => {
  const styles = {};

  const { bw, rtl } = props;
  let { btw, bbw, blw, brw } = props;

  btw = typeof btw === 'number' ? btw : bw ? bw : 0;
  bbw = typeof bbw === 'number' ? bbw : bw ? bw : 0;
  blw = typeof blw === 'number' ? blw : bw ? bw : 0;
  brw = typeof brw === 'number' ? brw : bw ? bw : 0;

  const temp_blw = blw;
  const temp_brw = brw;
  if ((brw || blw) && rtl) {
    blw = temp_brw;
    brw = temp_blw;
  }

  const { bc } = props;
  let { btc, bbc, blc, brc } = props;

  btc = btc || bc;
  bbc = bbc || bc;
  blc = blc || bc;
  brc = brc || bc;

  const temp_blc = blc;
  const temp_brc = brc;
  if ((brc || blc) && rtl) {
    blc = temp_brc;
    brc = temp_blc;
  }

  styles.borderTopWidth = roundToNearestPixel(btw);
  styles.borderBottomWidth = roundToNearestPixel(bbw);
  styles.borderLeftWidth = roundToNearestPixel(blw);
  styles.borderRightWidth = roundToNearestPixel(brw);

  styles.borderTopColor = getThemeColor(btc);
  styles.borderBottomColor = getThemeColor(bbc);
  styles.borderLeftColor = getThemeColor(blc);
  styles.borderRightColor = getThemeColor(brc);

  return styles;
};

export const borderRadiusStyles = props => {
  const styles = {};
  const { borderRadius, circleRadius } = props;

  if (borderRadius) {
    styles.borderRadius = Platform.OS==='ios'? borderRadius*.7 :borderRadius;
    styles.overflow = 'hidden';
  }

  if (circleRadius) {
    styles.width = responsiveWidth(circleRadius);
    styles.height = responsiveWidth(circleRadius);
    styles.borderRadius = responsiveWidth(circleRadius) / 2;
    styles.overflow = 'hidden';
  }

  return styles;
};
