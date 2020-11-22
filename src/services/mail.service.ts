import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  public sendmessage(email: string, confirmKey: string): void {
    this
      .mailerService
      .sendMail({
        to: `${email}`,
        from: 'ilearningfanfics@gmail.com',
        subject: 'Confirm account',
        text: `To confirm follow the link: https://fanfics-front.herokuapp.com/confirm/${email}/${confirmKey}`,
        html: `<p>To confirm follow the link: https://fanfics-front.herokuapp.com/confirm/${email}/${confirmKey}</p>`,
      })
      .then((data) => {console.log(data);})
      .catch((data) => {console.log(data);});
  }
}
