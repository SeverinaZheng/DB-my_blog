class AllController < ApplicationController
skip_before_action :verify_authenticity_token

  def new
  end

  def findit
  	render json: { success: "It works" }
  end
end
