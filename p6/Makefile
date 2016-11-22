PDFs := sh1.pdf \
	sh2.pdf \
	sh3.pdf

all: $(PDFs)

%.pdf: %.tex
	@pdflatex $<

clean:
	@rm -rf $(PDFs) *.log *.aux
