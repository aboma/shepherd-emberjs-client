require 'net/http'
require 'uri'

class ApplicationController < ApplicationController
  protect_from_forgery
  before_filter :verify_auth_token
  
  respond_to :html
  
  def index
  end
  
  def verify_auth_token
    params[:auth_token] = get_token
    if !params[:auth_token]
      not_authenticated
      return nil
    end
    net = Net::HTTP.new("localhost", 3000)
    request = Net::HTTP::Get.new("/sessions/#{params[:auth_token]}")
    request['Content-Type'] = 'application/json'
    request.add_field("X-AUTH-TOKEN", params[:auth_key])
    #response = Net::HTTP.get_response(URI.parse(uri))
    response = net.start { |http| http.request(request) }
    not_authenticated unless response.code == 200  
  end
  
  def not_authenticated
    redirect_to :action => 'new', :alert => "Please login.", :controller => 'sessions'
  end
  
  private 
  
  def get_token
    request.headers["X-AUTH-TOKEN"]
  end
end