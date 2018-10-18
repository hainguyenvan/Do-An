import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

import { AuthCustomService } from "../../auth-custom.service";

import { Config } from '../../../../../config';
import { ModalMessageComponent } from '../../modal/modal-message.component';

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(protected service: AuthCustomService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private modalService: NgbModal) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    let link = ['/pages/account'];

    let email = this.user.email;
    let pass = this.user.password;

    this.service.login(email, pass).subscribe(res => {
      if (res.status == 200) {
        localStorage.setItem(Config.TOKEN_KEY, res.data.token);
        localStorage.setItem(Config.OJBJECT_KEY, JSON.stringify(res.data));
        this.router.navigate(link);
      } else {
        const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Thông báo';
        activeModal.componentInstance.modalMessage = 'Email hoặc mật khẩu không đúng';
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}