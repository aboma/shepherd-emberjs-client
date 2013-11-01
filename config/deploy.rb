set :application, 'shepherd-emberjs-client'
set :scm, "git"
set :scm_verbose, true
set :repo_url, "git@github.com:aboma/shepherd-emberjs-client.git"
set :repository, "git@github.com:aboma/shepherd-emberjs-client.git"
#set :branch, "master"
#set :branch do
#  `git tag`.split("\n").last
#end

ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }
#
#server "162.243.11.113", :app, :web, :db, :primary => true
set :user, "deploy" # The server's user for deploys
set :deploy_to, '/var/www/shepherd-emberjs-client'
set :use_sudo, false

set :deploy_via, :remote_cache

# set :format, :pretty
# set :log_level, :debug
# set :pty, true

# set :linked_files, %w{config/database.yml}
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  after :finishing, 'deploy:cleanup'

end

namespace :nginx do
  desc "Restart nginx"
  task :restart do
    on roles(:app) do
      execute "/etc/init.d/nginx restart"
    end
  end

  desc "Show nginx status"
  task :status do
    on roles(:app) do
      execute "/etc/init.d/nginx status"
    end
  end
end
