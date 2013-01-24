class SessionsController < ApplicationController
  skip_before_filter :verify_auth_token, :only => [:new, :create]
  
  def create
    @auth_token = VilioAPI.new().login params
    if @auth_token
      session[:auth_token] = @auth_token if session
      redirect_to :action => 'index', :controller => 'application'
    else
      flash.now.alert = "Email or password was invalid"
      render :new
    end
  rescue Exception => ex
    logger.info "exception logging in with Vilio API: #{ex.message}"
    redirect_to_login("Error contacting API for login")
  end
  
  def destroy
    success = VilioAPI.new().logout(params[:auth_token])
    if success
      session[:auth_token] = nil if session
      redirect_to login_url, :alert => "You have been logged out"
    else 
      redirect_to login_url, :alert => "There was an error logging out"
    end
  end
end