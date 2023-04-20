class CreateUserTable < ActiveRecord::Migration[7.0]
  def change
    create_table :user_tables do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :password

      t.timestamps
    end
  end
end
