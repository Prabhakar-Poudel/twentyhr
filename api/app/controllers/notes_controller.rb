class NotesController < ApplicationController
  load_and_authorize_resource except: [:interview_note]

  def index
    notes = @notes.select(:id, :content, :interview_id, :author_id).order(created_at: :desc)
    render json: notes.as_json, status: :ok
  end

  def show
    render json: @note.as_json, status: :ok
  end

  def create
    if @note.save
      render json: @note, status: :created
    else
      render json: { }, status: :unprocessable_entity
    end
  end

  def update
    if @note.update(update_params)
      render json: @note, status: :ok
    else
      render json: { }, status: :unprocessable_entity
    end
  end

  def interview_note
    note = Note.find_by(interview_id: params[:interview_id], author: current_user)
    authorize! :read, note
    render json: note.as_json, status: :ok
  end

  private

  def create_params
    params.require(:note).permit(:content, :interview_id)
  end

  def update_params
    params.require(:note).permit(:content)
  end
end
