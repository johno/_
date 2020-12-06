install:
	yarn
	./node_modules/.bin/breadbox --dest public/web_modules

new:
	./scripts/new.sh

build:
	./node_modules/.bin/toast incremental .
	cp src/styles.css public

clean:
	rm -rf node_modules .tmp public

serve:
	./node_modules/.bin/serve public

dev:
	./scripts/dev.sh

deploy-vercel:
	vercel switch johno
	vercel --prod

deploy: build deploy-vercel

test:
	yarn workspace tachyons-compiler jest
