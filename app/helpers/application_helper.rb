module ApplicationHelper
  def api_path
    path = SHEPHERD_CONFIG.api.url.host + ':' + SHEPHERD_CONFIG.api.url.port.to_s
    path = File.join(path, SHEPHERD_CONFIG.api.url.path) if SHEPHERD_CONFIG.api.url.path
    path
  end
end