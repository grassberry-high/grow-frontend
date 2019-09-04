import {SharedPipesModule} from './shared-pipes.module';

describe('SharedPipesModule', () => {
  let sharedPipesModule: SharedPipesModule;

  beforeEach(() => {
    sharedPipesModule = new SharedPipesModule();
  });

  it('should create an instance', () => {
    expect(sharedPipesModule).toBeTruthy();
  });
});
