FROM jekyll/jekyll

#COPY Gemfile .
#COPY Gemfile.lock .

#RUN bundle install --quiet --clean

WORKDIR /web/

CMD ["jekyll", "serve"]
