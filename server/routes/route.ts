import { NextFunction, Request, Response } from "express";
import { IResult } from "../interfaces/result";
export enum Type {
  CHECK_FAIL,
  SUCCESS,
  BACKEND_ERROR,
  USER_NOT_LOGGED,
  DUPLICATE_USERNAME,
}
/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {

  protected title: string;

  private scripts: string[];

  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */
  constructor() {
    //initialize variables
    this.title = "Tour of Heros";
    this.scripts = [];

  }

  /**
   * Add a JS external file to the request.
   *
   * @class BaseRoute
   * @method addScript
   * @param src {string} The src to the external JS file.
   * @return {BaseRoute} Self for chaining
   */
  public addScript(src: string): BaseRoute {
    this.scripts.push(src);
    return this;
  }

  /**
   * Render a page.
   *
   * @class BaseRoute
   * @method render
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param view {String} The view to render.
   * @param options {Object} Additional options to append to the view's local scope.
   * @return void
   */
  public render(req: Request, res: Response, view: string, options?: Object) {
    //add constants
    res.locals.BASE_URL = "/";

    //add scripts
    res.locals.scripts = this.scripts;

    //add title
    res.locals.title = this.title;

    //render view
    res.render(view, options);
  }
/**
 * 根据传入的类型，返回数据
 * 
 * @param {Type} type 当前返回的类型
 * @param {Object} [data] 可选参数
 * @returns {IResult} 
 * @memberof BaseRoute
 */
protected result(type: Type, data?: Object): IResult {
    switch (type) {
      case Type.CHECK_FAIL:
        return {
          code: 1,
          msg: '用户名或者密码错误'
        }
      case Type.SUCCESS:
        return Object.assign({ code: 0 }, data)
      case Type.USER_NOT_LOGGED:
        return {
          code: 1,
          msg:'用户未登录'
        }
      case Type.DUPLICATE_USERNAME:
      return {
        code:1,
        msg:'用户名重复'
      }
      default:
        return {
          code: 1,
          msg: '未知错误'
        }
    }
  }
}