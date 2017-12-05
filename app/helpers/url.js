// TODO waiting for @davelandry to merge and release
// https://github.com/Datawheel/datawheel-canon/pull/55
// when that happens, __ASSET_HOST__ should be defined with an env var:
// export CANON_CONST_ASSET_HOST="https://s.datchile.io"
//
// and this const should be deleted.
const __ASSET_HOST__ = 'https://s.datachile.io';

// this is not technically right, we should be using an url-join function
// …but I don't want to introduce an additional dependency.
// Just make sure that __ASSET_HOST__ ends with a forward slash.
export function asset_url(relative) {
  return `${__ASSET_HOST__}${relative}`;
}
