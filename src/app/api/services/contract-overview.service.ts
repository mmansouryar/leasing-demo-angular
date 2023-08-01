/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { ContractOverviewPageResponse } from '../models/contract-overview-page-response';
import { PageRequest } from '../models/page-request';

@Injectable({ providedIn: 'root' })
export class ContractOverviewService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getContractOveriew()` */
  static readonly GetContractOveriewPath = '/contractoverviews';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContractOveriew()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractOveriew$Response(
    params: {
      page: PageRequest;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ContractOverviewPageResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ContractOverviewService.GetContractOveriewPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ContractOverviewPageResponse>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getContractOveriew$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractOveriew(
    params: {
      page: PageRequest;
    },
    context?: HttpContext
  ): Observable<ContractOverviewPageResponse> {
    return this.getContractOveriew$Response(params, context).pipe(
      map((r: StrictHttpResponse<ContractOverviewPageResponse>): ContractOverviewPageResponse => r.body)
    );
  }

}
