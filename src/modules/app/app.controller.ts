import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterface } from '@interfaces/Responses/response.interface';
import { AppService } from './app.service';
import { generateShareLink } from './../../../firebase-dynamiclink/index';

/**
 *
 */
@ApiTags(AppController.name)
@Controller()
export class AppController {
  /**
   *
   * @param appService Inject AppService instance to use it's methods
   */
  constructor(private readonly appService: AppService) {}

  /**
   * @returns ResponseInterface type response
   */
  @Get('home')
  async getHello(): Promise<ResponseInterface> {
    const dynamicLink = await generateShareLink(
      'http://quokkalabs.com',
      'hii',
      'hello',
    );
    return { status: 1000, data: { dynamicLink } };
  }

  /**
   * @returns ResponseInterface type response
   */
  @Get('healthcheck')
  async healthCheck(): Promise<ResponseInterface> {
    const response = this.appService.healthCheck();
    return { status: 1000, data: { response } };
  }
}
