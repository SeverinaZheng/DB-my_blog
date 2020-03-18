require 'test_helper'

class AllControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get findit" do
    get :findit
    assert_response :success
  end

end
