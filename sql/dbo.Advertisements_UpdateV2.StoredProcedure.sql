CREATE PROC [dbo].[Advertisements_UpdateV2]
		@AttorneyProfileId int
		,@AdTierId int
		,@Title nvarchar(100)
		,@AdMainImage nvarchar(400)
		,@Details nvarchar(255)
		,@DateStart datetime2(7)
		,@DateEnd datetime2(7)
		,@Id int OUTPUT

AS

/**********************Test Code***************
	Declare @Id int = 37;
	
	Declare @AttorneyProfileId int = 1
			,@AdTierId int = 2
			,@Title nvarchar(100) = 'Atorney 1'
			,@AdMainImage nvarchar(400) = 'Hire Me'
			,@Details nvarchar(255) = 'I am the best atorney'
			,@DateStart datetime2(7) = '2022-12-26'
			,@DateEnd datetime2(7) = '2022-12-26'

	Execute [dbo].[Advertisements_UpdateV2]	@AttorneyProfileId
									,@AdTierId
									,@Title
									,@AdMainImage
									,@Details
									,@DateStart
									,@DateEnd
									,@Id OUTPUT

		SELECT *
		FROM [dbo].[Advertisements]
		Where Id = @Id

*********************************************/

BEGIN

Declare @dateNow datetime2 = getutcdate();

UPDATE [dbo].[Advertisements]
   SET [AttorneyProfileId] = @AttorneyProfileId 
	  ,[AdTierId] = @AdTierId
      ,[Title] = @Title
      ,[AdMainImage] = @AdMainImage
      ,[Details] = @Details
      ,[DateModified] = @dateNow
      ,[DateStart] = @DateStart
      ,[DateEnd] = @DateEnd
 WHERE Id = @Id

END


GO
