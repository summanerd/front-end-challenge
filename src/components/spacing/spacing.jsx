import React from 'react';
import PropTypes from 'prop-types';

function getProp(prefix, spacing) {
  if (spacing) {
    return `${prefix}-${spacing}`;
  }
  return '';
}
function getMargin(m) {
  return getProp('margin', m);
}

function getPadding(m) {
  return getProp('padding', m);
}

function getBorder(m) {
  return getProp('border', m);
}

export function Spacing({ m, p, b }) {
  const className = `${getMargin(m)} ${getPadding(p)} ${getBorder(b)}`.trim();

  return (
    <div className={className} />
  );
}

Spacing.defuaulProps = {
  m: null,
  p: null,
  b: null,
};

Spacing.propTypes = {
  m: PropTypes.object,
  p: PropTypes.object,
  b: PropTypes.object,
};
