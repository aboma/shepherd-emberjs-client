class VilioAPI < Object
  @host = VILIO_CONFIG.api.url.host
  @port = VILIO_CONFIG.api.url.port
  
  class << self
    attr_reader :host, :port
  end
  
  def initialize 
    @net = Net::HTTP.new(VilioAPI.host, VilioAPI.port)
  end
  
  # verify authentication token with API to determine if
  # it is still valid
  #TODO fix so auth token is not in URL
  def verify_token token
    @auth_token = token
    get "/sessions/#{@auth_token}"
  end
  
  # get authentication token from API in return after posting
  # username and password
  def get_token params
    body = { :user => { :email => params[:email], :password => params[:password] } }.to_json
    response = post('/sessions', body)
    return nil unless response.code == '200'
    json = JSON.parse(response.body)
    return json['session']['auth_token']
  end
  
  def destroy_token token
    @auth_token = token
    response = get('/logout')
    return response.code == '200'
  end
  
  alias :login :get_token
  alias :logout :destroy_token
  
  private
  
  def get(path)
    request = Net::HTTP::Get.new(path)
    add_headers(request)
    @net.request(request) 
  end
  
  def post(path, json)
    request = Net::HTTP::Post.new(path)
    request.body = json
    add_headers(request)
    @net.request(request) 
  end
  
  def delete(path)
    request = Net::HTTP::Delete.new(path)
    add_headers(request)
    @net.request(request)
  end
  
  def add_headers(request)
    request['Content-Type'] = 'application/json'
    request['Accept'] = 'application/json'
    request["X-AUTH-TOKEN"] = @auth_token if @auth_token    
  end
  
end