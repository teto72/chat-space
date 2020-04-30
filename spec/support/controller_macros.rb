module ControllerMacros
  def login(user)
    @request.env["devise.mappings"] = Devise.mappings[:user]
    sign_in user
  end
end