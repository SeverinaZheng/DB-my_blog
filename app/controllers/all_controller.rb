class AllController < ApplicationController
skip_before_action :verify_authenticity_token

  def new
  end

  def findit

  	#render json: { success: "It works", operator: params[:operator].inspect,condition: params[:condition].inspect,table: params[:table].inspect}
  	render json: { success: "It works", sql: params[:sql]}
  end
end
