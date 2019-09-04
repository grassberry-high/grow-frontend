import {Component, OnInit} from '@angular/core';
import {AuthUserService} from '../services/auth-user.service';
import {FormGroup} from '@angular/forms';
import {FeedbackFormService} from './feedback-form.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  buttonDisabled = false;
  feedbackForm: FormGroup;
  typeOptions = ['Bug', 'Feature', 'Blog', 'Other'];
  radioOptions = {
    mood: {angry: '👿', worried: '😱', notPleased: '😧', neutral: '😐', smiling: '😬', twinkle: '😉', awesome: '🦄'}
  };

  constructor(
    private authUserService: AuthUserService,
    private feedBackFormService: FeedbackFormService
  ) {
    this.feedbackForm = this.feedBackFormService.buildFeedbackForm();
  }

  ngOnInit() {
  }


  // -------------------------------------- HELPER --------------------------

//   hotkeys.add({
//                 combo: ['ctrl+d', 'alt+d'],
//                 description: 'Fill with dummies',
//                 callback: () ->
//   feedbackService.getDummies(this.feedback)
// })


// -------------------------------------- REST -----------------------------

  sendFeedback() {
    //   $scope.$broadcast('show-errors-check-validity')
    //   if $scope.feedbackForm.$valid
    //     buttonDisabled = true
    //   feedbackService.sendFeedback(feedback).then (response) ->
    //   this.buttonDisabled = false
    //   BootstrapDialog.alert({
    //     title: 'Awesome',
    //     message: 'Thank you very much, we will evaluate your feedback soon!',
    //     type: BootstrapDialog.TYPE_SUCCESS
    //   })
    //     , (response)->
    //     BootstrapDialog.alert({
    //       title: 'Something went wrong',
    //       message: response.data.err,
    //       type: BootstrapDialog.TYPE_DANGER
    //     })
    // else
    //   console.error $scope.feedbackForm
    //   BootstrapDialog.alert({
    //     title: 'Missing fields',
    //     message: 'Please fill in the fields!',
    //     type: BootstrapDialog.TYPE_DANGER
    //   })
    //   return
  }

// -------------------------------------- USER ------------------------------

  getUser() {
    // this.authUserService.getUserData('all').then (user)->
    // this.user = user
    // this.bugData.user = user.facebook.id if user.facebook.id?
  }


  checkPermission(userType) {
    this.authUserService.checkPermission(userType);
  }
}
