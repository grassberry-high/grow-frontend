import {ErrMsgModule} from './err-msg.module';

describe('ErrMsgModule', () => {
  let errMsgModule: ErrMsgModule;

  beforeEach(() => {
    errMsgModule = new ErrMsgModule();
  });

  it('should create an instance', () => {
    expect(errMsgModule).toBeTruthy();
  });
});
