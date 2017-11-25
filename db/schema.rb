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

ActiveRecord::Schema.define(version: 20171125193653) do

  create_table "email_confirmations", force: :cascade do |t|
    t.string "address"
    t.string "code"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "user_name"
    t.string "display_name"
    t.integer "status"
    t.integer "invited_by"
    t.integer "role"
    t.string "phone"
    t.string "skype"
    t.string "profile_img"
    t.string "workspace_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "workspace_id"], name: "index_users_on_email_and_workspace_id", unique: true
    t.index [nil], name: "index_users_on_address", unique: true
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "domain"
    t.index ["domain"], name: "index_workspaces_on_domain", unique: true
  end

end
