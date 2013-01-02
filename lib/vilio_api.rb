class VilioAPI < Object
  @@host = "localhost"
  @@port = 4444
  
  def initialize 
    @net = Net::HTTP.new(@@host, @@port)
  end
  
  # verify authentication token with API to determine if
  # it is still valid
  def verify_token params
    @auth_token = params[:auth_token]
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
  
  alias :login :get_token
  
  private
  
  def get(path)
    request = Net::HTTP::Get.new(path)
    request['Content-Type'] = 'application/json'
    request['Accept'] = 'application/json'
    # attach authorization token if one exists
    request["X-AUTH-TOKEN"] = @auth_token if @auth_token
    @net.request(request) 
  end
  
  def post(path, json)
    request = Net::HTTP::Post.new(path)
    request.body = json
    request['Content-Type'] = 'application/json'
    request['Accept'] = 'application/json'
    # attach authorization token if one exists
    request["X-AUTH-TOKEN"] = @auth_token if @auth_token
    @net.request(request) 
  end
  
end