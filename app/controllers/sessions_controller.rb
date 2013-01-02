class SessionsController < ApplicationController
  skip_before_filter :verify_auth_token, :only => [:new, :create]
  
  def create
    @auth_token = VilioAPI.new().login params
    if @auth_token
      session[:auth_token] ||= @auth_token
      redirect_to :action => 'index', :controller => 'application'
    else
      flash.now.alert = "Email or password was invalid"
      render :new
    end
  end
  
  def destroy
    #logout
    #redirect_to login_url, :alert => "You have been logged out"
  end
end