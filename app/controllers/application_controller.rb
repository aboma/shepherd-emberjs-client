require 'net/http'
require 'uri'

class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :verify_auth_token
  respond_to :html
  
 
  def index
    render :index
  end
  
  def verify_auth_token
    params[:auth_token] = get_token
    unless params[:auth_token]
      redirect_to_login("Please login")
      return nil
    end
    VilioAPI.new().verify_token params[:auth_token]
    redirect_to_login("Please login") unless response.code == "200" 
  rescue Exception => ex
    redirect_to_login("Error contacting API for login")
  end
  
  def redirect_to_login( message )
    redirect_to :action => 'new', :alert => message, :controller => 'sessions'
  end
  
  private 
  
  def get_token
    request.headers['X-AUTH-TOKEN'] ? request.headers['X-AUTH-TOKEN'] : session[:auth_token]
  end

end