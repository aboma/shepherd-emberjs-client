# Capistrano v3
set :stage, :production

# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary
# server in each group is considered to be the first
# unless any hosts have the primary property set.
#role :app, %w{deploy@example.com}
#role :web, %w{deploy@example.com}
#role :db,  %w{deploy@example.com}

# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server
# definition into the server list. The second argument
# something that quacks like a has can be used to set
# extended properties on the server.
#server '162.243.11.113', user: 'aboma', roles: %w{web app}, my_property: :my_value

# you can set custom ssh options
# it's possible to pass any option but you need to keep in mind that net/ssh understand limited list of options
# you can see them in [net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start)
# set it globally
#  set :ssh_options, {
#    keys: %w('~/.ssh/id_rsa'),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
# and/or per server
 server '162.243.11.113',
   user: 'deploy',
   roles: %w{web app},
   primary: true,
   ssh_options: {
     keys: %w(~/.ssh/id_rsa),
     forward_agent: true,
     auth_methods: %w(publickey)
  }

#after "deploy:symlink:shared", "db:symlink"

#namespace :db do
#  desc "Make symlink for database yaml"
#  task :symlink do
#    on roles(:app) do 
#      execute :cp, "#{ deploy_to }/config/database.yml", "#{ release_path }/config/database.yml"
#    end
#  end
#end

# These Puma tasks rely on the puma Ubuntu Upstart tools, part of 
# the Puma jungle tool, found in the puma distribution tool directory. The Upstart
# config file must be edited to allow user sudo-less ability to start and stop jobs
namespace :puma do
  desc "Start Puma Manager"
  task :start_manager do
    on roles(:app) do
      execute "start puma-manager"
    end
  end

  desc "Register Puma application"
  task :add do
    on roles(:app) do
      execute "grep -w '#{release_path}' /etc/puma.conf || printf \"#{release_path}\\n\" >> /etc/puma.conf"
    end
  end

  task :remove do
    on roles(:app) do
    end
  end

  desc "Start puma instance for this application"
  task :start do
    on roles(:app) do 
      execute "start puma app=#{release_path}"
    end
  end

  desc "Stop puma instance for this application"
  task :stop do
    on roles(:app) do
      execute "stop puma app=#{release_path}"
    end
  end

  desc "Restart puma instance for this application"
  task :restart do
    on roles(:app) do
      execute "restart puma app=#{release_path}"
    end
  end

  desc "Show status of puma for this application"
  task :status do
    on roles(:app) do
      execute "status puma app=#{release_path}"
    end
  end
end

after "deploy:starting", "puma:stop"
after "deploy:finished", "puma:start"
#after "deploy:symlink:shared", "puma:after_symlink"

# setting per server overrides global ssh_options

# fetch(:default_env).merge!(rails_env: :production)
