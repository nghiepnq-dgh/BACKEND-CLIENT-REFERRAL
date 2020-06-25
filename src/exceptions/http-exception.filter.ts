import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    if (process.env.NODE_ENV !== 'production') {
      this.logger.error(`
              =======================================    
              [Exception] Have a exception - Stack: ${JSON.stringify(
                exception.name,
              )} - ${exception}
              ======================================
              ${exception} 
              ================= MESSAGE ============
              ${exception.message}
              ================== DATE ==============
              ${new Date().toISOString()}
              ================== URL ===============
              ${request.url}
              ================ STATUS ==============
              ${status}
              `);
    }
    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception?.name,
      message: exception?.message,
    });
  }
}
