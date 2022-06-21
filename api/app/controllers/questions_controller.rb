class QuestionsController < ApplicationController
  load_and_authorize_resource

  def index
    questions =
      @questions
        .includes(:creator)
        .select(:id, :title, :description, :status, :creator_id)
        .order(created_at: :desc)
    render json: questions.as_json(except: :creator_id, include: { creator: { only: [:name, :email, :id] }}), status: :ok
  end

  def show
    if @question
      render json: @question, status: :ok
    else
      render json: { }, status: :not_found
    end
  end

  def create
    @question.organization_id = current_organization.id
    if @question.save
      render json: @question, status: :created
    else
      render json: { }, status: :unprocessable_entity
    end
  end

  def update
    if @question.update(question_params)
      render json: @question, status: :ok
    else
      render json: { }, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:title, :description, :status, :initial_code, :language, :guidelines, :instruction)
  end
end
