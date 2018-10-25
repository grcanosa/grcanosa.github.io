FROM jekyll/jekyll:3.8

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install --quiet --clean

CMD ["jekyll", "serve","--drafts"]
