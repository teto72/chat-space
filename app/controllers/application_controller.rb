class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
end

protected_methods

def configure_permitted_parameters
  devise_parameter_sanitizer.permit(:sign_up,keys: [:nickname])
end
