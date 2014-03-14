# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20130708183619) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_assignments", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "board_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "boards", force: true do |t|
    t.string   "title",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "card_assignments", force: true do |t|
    t.integer  "card_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cards", force: true do |t|
    t.string   "title",       null: false
    t.text     "description"
    t.integer  "rank",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "list_id",     null: false
  end

  create_table "lists", force: true do |t|
    t.string   "title",      null: false
    t.integer  "rank",       null: false
    t.integer  "board_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "todo_items", force: true do |t|
    t.integer  "card_id",                    null: false
    t.boolean  "done",       default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title",                      null: false
  end

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "session_token"
  end

end
