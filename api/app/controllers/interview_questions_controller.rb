class InterviewQuestionsController < ApplicationController
  load_and_authorize_resource

  def index
    questions = @interview_questions.select(:id, :title, :description, :organization_id, :creator_id, :status)
    render json: questions, status: :ok
  end

  def show
  end

  def create
  end

  def update
  end
end
