require 'net/http'
require 'uri'

class SessionsController < ApplicationController
  skip_before_filter :verify_auth_token, :only => [:new, :create]
  
  def create
    @auth_token = get_auth_token params
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
  
  private 
  
  def get_auth_token params
    net = Net::HTTP.new("localhost", 4444)
    request = Net::HTTP::Post.new("/sessions")
    request.body = "{ \"user\" : {\"email\" : \"#{params[:email]}\", \"password\" : \"#{params[:password]}\" }}"
    request['Content-Type'] = 'application/json'
    request['Accept'] = 'application/json'
    response = net.request(request) 
    return nil unless response.code == "200"
    logger.debug "response is a success!"
    json = JSON.parse(response.body)
    logger.debug "json is #{json}"
    return json['session']['auth_token']
  end
end