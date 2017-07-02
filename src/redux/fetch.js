import config from '../config';
import {_REQUEST, _SUCCESS, _FAILURE} from './constants/baseTypes';


class Fetch {
  constructor(opts) {
    this._credentials = 'include';
    this._endpoint = opts.endpoint;
    this._body = opts.body;
    this._method = opts.method;
    this._contentType = opts.contentType;
    this._clearType = opts.clearType;
    this._rest = opts.rest;
    this._next = opts.next;
  }

  _riseError(response, errMsg) {
    this._next({
      response,
      error: errMsg,
      result: {},
      type: this._clearType + _FAILURE
    });
  }

  _isSuccessStatus(response) {
    return response.status >= 200 && response.status < 300;
  }

  _parseJSON(response) {
    return response.json().catch((error) => {
      this._riseError(response, `Can't parse json`);
      return new Error(`Can't parse json: `, error);
    });
  }

  send() {
    return fetch(`${config.apiBaseUrl}:${config.port}/${this._endpoint}`, {
      credentials: this._credentials,
      mode: 'cors',
      method: this._method,
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify(this._body)
    })
      .then(response => {
        if (this._isSuccessStatus(response)) {
          return this._parseJSON(response).then(result => {
            this._next({
              ...this._rest,
              result,
              type: this._clearType + _SUCCESS
            });
            return result;
          })
        } else {
          this._parseJSON(response).then(error => {
            this._riseError(error, error.message)
          });
        }
      });
  }
}

export default ({dispatch, getState}) => next => action => {
  const {endpoint, type, body, method = 'GET', contentType = 'application/json', ...rest} = action;

  if (!endpoint) return next(action);
  const clearType = type.replace(/_REQUEST|_SUCCESS|_FAILURE$/, '');

  let request = new Fetch({clearType, endpoint, body, method, contentType, rest, next});
  return request.send();
};