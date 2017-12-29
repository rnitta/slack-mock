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

ActiveRecord::Schema.define(version: 20171229182612) do

  create_table "channel_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "channel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "starred", default: false
    t.index ["channel_id"], name: "index_channel_users_on_channel_id"
    t.index ["user_id"], name: "index_channel_users_on_user_id"
  end

  create_table "channels", force: :cascade do |t|
    t.integer "workspace_id"
    t.string "name"
    t.boolean "public", default: true, null: false
    t.string "topic"
    t.integer "count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id"], name: "index_channels_on_workspace_id"
  end

  create_table "emails", force: :cascade do |t|
    t.string "address"
    t.string "code"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address"], name: "index_emails_on_address", unique: true
  end

  create_table "invitations", force: :cascade do |t|
    t.string "token"
    t.string "email"
    t.integer "user_id"
    t.integer "workspace_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_invitations_on_user_id"
    t.index ["workspace_id"], name: "index_invitations_on_workspace_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "workspace_id"
    t.integer "sender_id", null: false
    t.integer "receiver_type", null: false
    t.integer "receiver_id", null: false
    t.text "message", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
    t.index ["workspace_id"], name: "index_messages_on_workspace_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "user_name"
    t.string "display_name"
    t.integer "status", default: 0
    t.integer "invited_by"
    t.integer "role"
    t.string "phone"
    t.string "skype"
    t.string "profile_img"
    t.integer "workspace_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "token"
    t.index ["email", "workspace_id"], name: "index_users_on_email_and_workspace_id", unique: true
    t.index ["workspace_id"], name: "index_users_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "domain"
    t.index ["domain"], name: "index_workspaces_on_domain", unique: true
  end

end
