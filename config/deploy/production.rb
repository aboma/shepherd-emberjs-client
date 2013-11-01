set :stage, :production
set :puma_application, 'shepherd-emberjs-client'

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
   user: 'aboma',
   roles: %w{web app},
   primary: true,
   ssh_options: {
     keys: %w(~/.ssh/id_rsa),
     forward_agent: true,
     auth_methods: %w(publickey)
  }

namespace :puma do
  desc "Start puma instance for this application"
  task :start do
    on roles(:app) do 
      execute "/etc/init.d/puma start #{puma_application}"
    end
  end

  desc "Stop puma instance for this application"
  task :stop do
    on roles(:app) do
      execute "/etc/init.d/puma stop #{puma_application}"
    end
  end

  desc "Restart puma instance for this application"
  task :restart do
    on roles(:app) do
      execute "/etc/init.d/puma restart #{puma_application}"
    end
  end

  desc "Show status of puma for this application"
  task :status do
    on roles(:app) do
      execute "/etc/init.d/puma status #{puma_application}"
    end
  end

  desc "Show status of puma for all applications"
  task :overview do
    on roles(:app) do
      execute "/etc/init.d/puma status"
    end
  end

  desc "Create a shared tmp dir for puma state files"
  task :after_symlink do
    on roles(:app) do
      execute :rm, "-rf", "#{release_path}/puma-tmp"
      execute :ln, "-s", "#{shared_path}/puma-tmp", "#{release_path}/puma-tmp"
    end
  end
end

#after "deploy:finished", "puma:restart"
#after "deploy:symlink:shared", "puma:after_symlink"

# setting per server overrides global ssh_options

# fetch(:default_env).merge!(rails_env: :production)
