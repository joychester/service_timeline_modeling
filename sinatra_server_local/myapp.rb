require 'sinatra'
require 'yaml'

configure do
    set :bind, '0.0.0.0'
    set :root, File.expand_path("#{File.dirname(__FILE__)}")
    set :views, Dir.pwd + '/views'
    set :public_folder, Dir.pwd + '/public'
    set :haml, :format => :html5
end 

get '/' do
    haml :index
end
