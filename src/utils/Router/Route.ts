import { someObject } from '../../const/types';
import {utils} from '../../utils';
import Block from '../Component';
import IComponent from '../Component/ComponentInterface';

const {render, isEqual} = utils;

export default class Route {
	protected _pathname = "";
	protected _blockClass = null as unknown as typeof Block;
	protected _block: IComponent;
	protected _props = {};

  constructor(pathname: string, view: typeof Block, props: someObject) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null as unknown as IComponent;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
		console.log('leave', this._pathname)
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (this._block) {
			this._block.show();
		} else {
			this._block = new this._blockClass('div', this._props);
			
			render('div', this._block)
		}
  }
}
