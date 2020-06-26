import {
  Injectable,
  Logger,
  HttpService,
  BadRequestException,
} from '@nestjs/common';
import Axios from 'axios';
import { Config } from '../config/configuration';

@Injectable()
export class ReferralService {
  constructor(private httpService: HttpService) {}
  private readonly logger = new Logger(ReferralService.name);

  async _sendRequest({ url, method, data }) {
    try {
      const response = await Axios({
        url,
        method: method,
        timeout: 80000,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });
      if (response?.data) {
        const { accessToken } = response.data;
        return {
          code: 200,
          accessToken,
          message: 'OK',
        };
      }
      return {
        success: false,
        code: 404,
        message: 'Response data is empty',
      };
    } catch (error) {
      const { response = {} } = error;
      if (response) {
        const {
          data: { statusCode, message },
        } = response;
        return {
          success: false,
          code: statusCode,
          message,
        };
      }
      return {
        success: false,
        code: response.status,
        message: response.statusText,
      };
    }
  }

  async _sendRequestWithAuth({ url, method, data }) {
    try {
      const token = await this.getTokenIntegrate(
        Config.EMAIL_CLIENT,
        Config.PASSWORD_CLIENT,
      );
      if (!token) throw new BadRequestException('Fail to integrate referral');
      const response = await Axios({
        baseURL: Config.API_REFERRAL_SERVICE,
        url,
        method: method,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      if (response && response.data) {
        const { data } = response;
        return {
          code: 200,
          data,
          message: 'OK',
        };
      }
      return {
        success: false,
        code: 404,
        message: 'Response data is empty',
      };
    } catch (error) {
      const { response = {} } = error;
      if (response && response.data) {
        const {
          data: { statusCode, message },
        } = response;
        return {
          success: false,
          code: statusCode,
          message,
        };
      }
      return {
        success: false,
        code: response.status,
        message: response.statusText,
      };
    }
  }

  /**
   * Login into Refferal System.
   * @returns Authen Token (JWT)
   */
  async getTokenIntegrate(userid, password) {
    const response = await this._sendRequest({
      url: `${Config.API_REFERRAL_SERVICE}/v2/auth/token`,
      method: 'POST',
      data: { userid, password, grantType: 'client_account' },
    });
    if (response?.accessToken) {
      if (response?.accessToken) {
        this.logger.log(
          `[Refferal] Authen sucessful | ${response?.accessToken}`,
        );
        return response?.accessToken;
      }
    } else {
      this.logger.error(
        `[Refferal] Intergrate Error ${response.message} - ${response.code}`,
      );
    }
  }

  async createCustomerReferral({ name,inviterId,clientCustomerId, email }) {
    const response = await this._sendRequestWithAuth({
        url: `${Config.API_REFERRAL_SERVICE}/v2/customer`,
        method: 'POST',
        data: { name, inviterId, clientCustomerId, email },
    })
    if (response) {
        this.logger.log(
            `[Refferal] Create customer success | ${JSON.stringify(response)}`,
        );
    } else {
        this.logger.log(
            `[Refferal] Create customer false | ${response.message} - ${response.code}`,
        );
    }
  }
}
