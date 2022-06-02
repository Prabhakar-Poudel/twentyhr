class InterviewsController < ApplicationController
  load_and_authorize_resource

  def index
    interviews =
      @interviews
        .includes(:creator)
        .select(:id, :title, :status, :creator_id, :created_at)
        .order(created_at: :desc)
    render json: interviews.as_json(except: :creator_id, include: { creator: { only: [:name, :email, :id] }}), status: :ok
  end

  def show
    if @interview
      render json: @interview.as_json(except: [:question_id], include: { question: { only: [:id, :title, :description, :instruction, :guidelines, :initial_code, :language] }}), status: :ok
    else
      render json: { }, status: :not_found
    end
  end

  def create
    @interview.organization_id = current_organization.id
    @interview.title = "Interview #{SecureRandom.base36(8)}" if @interview.title.blank?
    if @interview.save
      render json: @interview, status: :created
    else
      render json: { }, status: :unprocessable_entity
    end
  end

  def update
    if @interview.update(interview_params)
      render json: @interview, status: :ok
    else
      render json: { }, status: :unprocessable_entexitity
    end
  end

  private

  def interview_params
    params.require(:interview).permit(:title, :status, :question_id)
  end
end
