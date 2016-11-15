FILES := p2.pdf
EXTS := %.pdf

all: $(FILES)

$(EXTS): %.pmd
	@pandoc -S -s $< -o $@ --number-sections

clean:
	@rm -rf $(FILES)
