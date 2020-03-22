class AllController < ApplicationController
skip_before_action :verify_authenticity_token

  def new
  end

  def findit

  	#render json: { success: "It works", operator: params[:operator].inspect,condition: params[:condition].inspect,table: params[:table].inspect}
  	
  	@results = User.find_by_sql(params[:sql])
  	render json: { html: render_to_string(:template => 'all/findit') }
  
  	
  end
end
