PDFs := sh1.pdf

all: $(PDFs)

%.pdf: %.tex
	@pdflatex $<

clean:
	@rm -rf $(PDFs) *.{log,aux}
