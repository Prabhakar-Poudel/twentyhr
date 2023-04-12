class InterviewsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[ping show]
  load_and_authorize_resource except: %i[ping]

  def index
    interviews =
      @interviews
        .includes(:creator, :question)
        .select(:id, :title, :status, :created_at, :creator_id, :question_id)
        .order(created_at: :desc)
    render(
      json: interviews.as_json(
        except: %i[creator_id question_id],
        include: {
          creator: {
            only: %i[name email id]
          },
          question: {
            only: %i[title id]
          }
        }
      ),
      status: :ok
    )
  end

  def show
    if @interview
      question_fields =
        if can?(:edit, @interview)
          %i[id title description instruction guidelines initial_code language]
        else
          %i[id description instruction initial_code language]
        end

      render(
        json: @interview.as_json(
          except: [:question_id],
          include: { question: { only: question_fields }}
        ),
        status: :ok
      )
    else
      render json: { }, status: :not_found
    end
  end

  def create
    @interview.creator_id = current_user.id
    @interview.organization_id = current_organization.id
    @interview.title = "Interview #{SecureRandom.base36(8)}" if @interview.title.blank?
    @interview.language = @interview.question&.language if @interview.language.blank?
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
      render json: { }, status: :unprocessable_entity
    end
  end

  def ping
    interview = Interview.includes(:organization).find(params[:id])
    authorize! :read, interview
    render json: interview.as_json(only: [:status], include: { organization: { only: [:name] }}), status: :ok
  end

  private

  def interview_params
    params.require(:interview).permit(:title, :status, :question_id, :language)
  end
end
