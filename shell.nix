{ stdenv
, pkgs
,
}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-12_x
    # Yarn setup
    # (yarn.override { nodejs = nodejs-12_x; })
  ];
}
