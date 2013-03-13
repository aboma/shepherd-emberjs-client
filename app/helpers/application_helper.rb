module ApplicationHelper
  def api_path
    path = VILIO_CONFIG.api.url.host + ':' + VILIO_CONFIG.api.url.port.to_s
    path = File.join(path, VILIO_CONFIG.api.url.path) if VILIO_CONFIG.api.url.path
    path
  end
end