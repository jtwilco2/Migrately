CREATE PROC [dbo].[Advertisements_InsertV2]
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
	Declare @Id int = 0;
	
	Declare @AttorneyProfileId int = 1
			,@AdTierId int = 1
			,@Title nvarchar(100) = 'Atorney 1'
			,@AdMainImage nvarchar(400) = 'Please Hire Me'
			,@Details nvarchar(255) = 'I am a great atorney'
			,@DateStart datetime2(7) = '2022-12-26'
			,@DateEnd datetime2(7) = '2022-12-26'

	Execute [dbo].[Advertisements_InsertV2] @AttorneyProfileId
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

INSERT INTO [dbo].[Advertisements]
           ([AttorneyProfileId]
		   ,[AdTierId]
           ,[Title]
           ,[AdMainImage]
           ,[Details]
           ,[DateStart]
           ,[DateEnd])
     VALUES
           (@AttorneyProfileId
		   ,@AdTierId
           ,@Title
           ,@AdMainImage
           ,@Details
           ,@DateStart
           ,@DateEnd)

	SET @Id = SCOPE_IDENTITY()

END


GO
