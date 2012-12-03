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
    if !params[:auth_token]
      redirect_to_login
      return nil
    end
    logger.debug 'checking auth token validitity with API'
    net = Net::HTTP.new("localhost", 4444)
    request = Net::HTTP::Get.new("/sessions/#{params[:auth_token]}")
    request['Content-Type'] = 'application/json'
    request["X-AUTH-TOKEN"] = params[:auth_token]
    #response = Net::HTTP.get_response(URI.parse(uri))
    response = net.start { |http| http.request(request) }
    redirect_to_login unless response.code == "200" 
  end
  
  def redirect_to_login
    redirect_to :action => 'new', :alert => "Please login.", :controller => 'sessions'
  end
  
  private 
  
  def get_token
    request.headers['X-AUTH-TOKEN'] ? request.headers['X-AUTH-TOKEN'] : session[:auth_token]
  end
end